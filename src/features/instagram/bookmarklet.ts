// The exporter that runs *on* instagram.com. Because it executes in Instagram's
// own origin (same-origin), it can call the private friendships API with the
// user's existing session — no password, no CORS, no server. The output JSON is
// consumed by parseDirectExport. A `javascript:` URL may contain newlines, so we
// keep the source readable rather than minifying. `void 0` at the end stops the
// browser from navigating away when the bookmarklet runs.
const source = `(async () => {
  const APP_ID = '936619743392459';
  if (!location.hostname.endsWith('instagram.com')) { alert('Open instagram.com first, log in, then run this.'); return; }
  const match = document.cookie.match(/ds_user_id=(\\d+)/);
  if (!match) { alert('You are not logged into Instagram in this browser. Log in at instagram.com, then run this.'); return; }
  const uid = match[1];

  const box = document.createElement('div');
  box.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:rgba(15,23,42,.6);display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif';
  const card = document.createElement('div');
  card.style.cssText = 'background:#fff;color:#0f172a;border-radius:20px;padding:20px;max-width:420px;width:90%;box-shadow:0 24px 70px rgba(0,0,0,.35);box-sizing:border-box';
  box.appendChild(card); document.body.appendChild(box);
  const status = document.createElement('div');
  status.style.cssText = 'font-size:15px;font-weight:600;line-height:1.4';
  status.textContent = 'Starting…';
  card.appendChild(status);
  const close = () => box.remove();

  const fetchList = async (kind) => {
    const users = []; let maxId = '';
    while (true) {
      const url = 'https://www.instagram.com/api/v1/friendships/' + uid + '/' + kind + '/?count=50' + (maxId ? '&max_id=' + maxId : '');
      const res = await fetch(url, { headers: { 'x-ig-app-id': APP_ID }, credentials: 'include' });
      if (res.status === 429) throw new Error('Instagram is rate-limiting. Wait a few minutes and try again.');
      if (!res.ok) throw new Error('Request failed (' + res.status + '). Make sure you are logged in.');
      const data = await res.json();
      (data.users || []).forEach((u) => users.push(u.username));
      status.textContent = 'Fetching ' + kind + '… ' + users.length;
      if (!data.next_max_id) break;
      maxId = data.next_max_id;
      await new Promise((r) => setTimeout(r, 600));
    }
    return users;
  };

  const button = (label, primary, onClick) => {
    const b = document.createElement('button');
    b.textContent = label;
    b.style.cssText = 'flex:1;padding:11px;border-radius:12px;border:0;font-weight:600;font-size:14px;cursor:pointer;' + (primary ? 'background:#e1306c;color:#fff' : 'background:#f1f5f9;color:#0f172a');
    b.onclick = onClick;
    return b;
  };

  try {
    const followers = await fetchList('followers');
    const following = await fetchList('following');
    const json = JSON.stringify({ followers, following });
    status.textContent = 'Done — ' + followers.length + ' followers, ' + following.length + ' following. Copy this and paste it back in the app.';

    const area = document.createElement('textarea');
    area.readOnly = true; area.value = json;
    area.style.cssText = 'width:100%;height:84px;margin-top:12px;border:1px solid #e2e8f0;border-radius:12px;padding:9px;font-size:12px;color:#000;box-sizing:border-box;resize:none';
    card.appendChild(area);

    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:8px;margin-top:12px';
    row.appendChild(button('Copy', true, async () => {
      try { await navigator.clipboard.writeText(json); } catch (e) { area.select(); document.execCommand('copy'); }
      status.textContent = 'Copied! Go back to the app and paste it.';
    }));
    row.appendChild(button('Close', false, close));
    card.appendChild(row);
  } catch (err) {
    status.textContent = (err && err.message) || 'Something went wrong.';
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;margin-top:12px';
    row.appendChild(button('Close', false, close));
    card.appendChild(row);
  }
})();void 0;`

export const BOOKMARKLET_HREF = `javascript:${source}`

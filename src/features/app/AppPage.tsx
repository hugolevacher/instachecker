import { useRef } from 'react'
import { Modal } from '../../components/Modal'
import { OnboardingCarousel } from '../../components/OnboardingCarousel'
import { AppHeader } from './AppHeader'
import { HeroPanel } from './HeroPanel'
import { ResultsPanel } from './ResultsPanel'
import { useAppController } from './useAppController'

export function AppPage() {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const resultsRef = useRef<HTMLElement | null>(null)
    const controller = useAppController({ fileInputRef, resultsRef })

    return (
        <div
            className="relative min-h-screen overflow-hidden text-slate-700"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
                event.preventDefault()
                const file = event.dataTransfer.files?.[0]
                if (file) {
                    void controller.handleFileSelected(file)
                }
            }}
        >
            <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(225,48,108,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(247,119,55,0.12),transparent_28%),linear-gradient(180deg,#fff7fb_0%,#ffffff_74%,#f8fafc_100%)] bg-fixed" />
            <div
                className={`pointer-events-none fixed inset-1 z-50 rounded-3xl border-4 border-dashed border-[#e1306c]/80 sm:inset-3 sm:rounded-4xl transition-opacity duration-200 ${controller.isDragging ? 'opacity-100' : 'opacity-0'
                    }`}
            />
            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-8 pt-6 sm:px-6 lg:px-8">
                <AppHeader />

                <main className="mt-8 grid flex-1 gap-6 lg:mt-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
                    <HeroPanel
                        isParsing={controller.isParsing}
                        error={controller.error}
                        onOpenGuide={controller.openGuide}
                        onBrowse={controller.handleBrowse}
                        onFileSelected={controller.handleFileSelected}
                    />

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".zip"
                        className="hidden"
                        onChange={controller.handleInputChange}
                    />

                    <section ref={resultsRef} className="space-y-4 lg:pt-1">
                        <ResultsPanel
                            analysis={controller.analysis}
                            activeTab={controller.activeTab}
                            searchValue={controller.activeSearch}
                            onTabChange={controller.setActiveTab}
                            onSearchChange={controller.updateActiveSearch}
                            onCopy={controller.copyActiveTab}
                            copied={controller.copiedTab === controller.activeTab}
                            onOpenAccount={controller.openInstagramAccount}
                        />
                    </section>
                </main>
            </div>

            <Modal open={controller.showGuide} onClose={controller.closeGuide}>
                <Modal.Header>
                    <Modal.TitleGroup>
                        <Modal.Overline>Guide</Modal.Overline>
                        <Modal.Title>{controller.guideTitle}</Modal.Title>
                    </Modal.TitleGroup>
                    <Modal.Close />
                </Modal.Header>
                <Modal.Body>
                    <OnboardingCarousel
                        slides={controller.guideSlides}
                        baseIndex={controller.slideIndex}
                        overlayIndex={controller.overlaySlideIndex}
                        overlayMode={controller.overlayMode}
                        direction={controller.slideDirection}
                        isFirstSlide={controller.slideIndex === 0}
                        isLastSlide={controller.slideIndex === controller.guideSlides.length - 1}
                        onPrevious={controller.goToPreviousSlide}
                        onNext={controller.goToNextSlide}
                        onDone={controller.closeGuide}
                        onJump={controller.jumpToSlide}
                        onTransitionEnd={controller.handleTransitionEnd}
                    />
                </Modal.Body>
            </Modal>
        </div>
    )
}

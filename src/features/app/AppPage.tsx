import { useRef } from 'react'
import { Modal } from '../../components/Modal'
import { OnboardingCarousel } from '../../components/OnboardingCarousel'
import { AppHeader } from './AppHeader'
import { HeroPanel } from './HeroPanel'
import { ResultsPanel } from './ResultsPanel'
import { useAppController } from './useAppController'
import { appPageTheme } from '../../theme/features/app/page'

export function AppPage() {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const resultsRef = useRef<HTMLElement | null>(null)
    const controller = useAppController({ fileInputRef, resultsRef })
    const pageTheme = appPageTheme({ dragging: controller.isDragging })

    return (
        <div
            className={pageTheme.root()}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
                event.preventDefault()
                const file = event.dataTransfer.files?.[0]
                if (file) {
                    void controller.handleFileSelected(file)
                }
            }}
        >
            <div className={pageTheme.background()} />
            <div className={pageTheme.dragOverlay()} />
            <div className={pageTheme.container()}>
                <AppHeader />

                <main className={pageTheme.main()}>
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
                        className={pageTheme.fileInput()}
                        onChange={controller.handleInputChange}
                    />

                    <section ref={resultsRef} className={pageTheme.resultsSection()}>
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

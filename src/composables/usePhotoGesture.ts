export function useGesture(
    onSwipeLeft: () => void,
    onSwipeRight: () => void
) {
    let startX = 0

    function onTouchStart(event: TouchEvent) {
        startX = event.touches[0].clientX
    }

    function onTouchEnd(event: TouchEvent) {
        const deltaX = event.changedTouches[0].clientX - startX

        if (deltaX < -50) onSwipeLeft()
        if (deltaX > 50) onSwipeRight()
    }

    return { onTouchStart, onTouchEnd }
}
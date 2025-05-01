const MAXIMUM_MOVEMENT = 100;

// Utility functions
const calculateCenter = (rect) => ({
    x: rect.width / 2,
    y: rect.height / 2,
});

const calculateOffset = (event, rect) => ({
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
});

const calculateDelta = (offset, center) => ({
    x: (offset.x - center.x) / center.x,
    y: (offset.y - center.y) / center.y,
});

const calculateMovement = (delta) => ({
    x: delta.x * MAXIMUM_MOVEMENT,
    y: delta.y * MAXIMUM_MOVEMENT,
});

// Main floating image handler class
class FloatingImageHandler {
    constructor(item) {
        this.item = item;
        this.floatingImage = item.querySelector(".cdx-floating-image");
        this.bindEvents();
    }

    bindEvents() {
        this.item.addEventListener("mousemove", this.handleMouseMove.bind(this));
    }

    handleMouseMove(event) {
        const rect = this.item.getBoundingClientRect();
        const offset = calculateOffset(event, rect);
        const center = calculateCenter(rect);
        const delta = calculateDelta(offset, center);
        const movement = calculateMovement(delta);

        this.updateImagePosition(movement);
    }

    updateImagePosition(movement) {
        this.floatingImage.style.transform = `translate(${movement.x}px, ${movement.y}px)`;
    }
}

// Initialize
document.querySelectorAll(".cdx-audio-item").forEach((item) => new FloatingImageHandler(item));

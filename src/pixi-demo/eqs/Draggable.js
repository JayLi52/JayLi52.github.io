class Draggable extends PIXI.Container {
    isDragging = false;
    offset = { x: 0, y: 0 };

    constructor() {
        super();
        this.init();
    }

    init() {
        this.interactive = true; // 启用交互
        this.buttonMode = true; // 设置光标为手型
        this.on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);
    }

    onDragStart(event) {
        this.isDragging = true;
        this.offset.x = this.x - event.data.global.x;
        this.offset.y = this.y - event.data.global.y;

        // 禁用舞台的交互性
        app.stage.interactive = false;
    }

    onDragEnd() {
        this.isDragging = false;

        // 启用舞台的交互性
        app.stage.interactive = true;
    }

    onDragMove(event) {
        if (this.isDragging) {
            const newPosition = event.data.global;
            this.x = newPosition.x + this.offset.x;
            this.y = newPosition.y + this.offset.y;
        }
    }
}


module.exports = Draggable
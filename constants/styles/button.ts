const button = {
    boxShadow: {
        default: (color: string, thickness = 7) => `0 ${thickness}px 0 ` + color,
        pressed: "0 0 0"
    },
    transform: {
        default: "translateY(0px)",
        pressed: (thickness = 7) => `translateY(${thickness}px)`
    }
}

export default button;
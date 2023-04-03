const app = () => {

    /**
     * Scene
     */
    let canvas = document.querySelector('.canvas')
    let dpr = window.devicePixelRatio
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.maxWidth = window.innerWidth + 'px'
    canvas.style.maxHeight = window.innerHeight + 'px'

    let cw = canvas.width
    let ch = canvas.height
    let cw2 = cw / 2
    let ch2 = ch / 2

    let ctx = canvas.getContext('2d')


    const BaseAudioContext = window.AudioContext || window.webkitAudioContext
    const context = new BaseAudioContext()

    // const oscillator = context.createOscillator()


    /**
     * Cursor
     */
    const cursor = {
        x: 0,
        y: 0,
    }

    window.addEventListener('mousemove', (e) => {
        cursor.x = e.x * dpr
        cursor.y = e.y * dpr
    })


    // var freq = 200

    // function changeNote() {
    //     freq = freq * 1.5
    //     if (freq > 600) {
    //         freq = (cursor.x * cursor.y) / 1000
    //     }
    //     oscillator.frequency.value = freq
    //     oscillator.frequency.setValueAtTime(freq, context.currentTime)
    // }


    /**
     * Noise
     */
    let simplex = new window.SimplexNoise()
    let time = 0

    const tick = () => {

        requestAnimationFrame(tick)

        // ctx.clearRect(0, 0, cw, ch)
        ctx.globalAlpha = 0.1
        ctx.fillRect(0, 0, cw, ch)
        // ctx.globalAlpha = Math.abs(Math.cos(time))
        ctx.globalAlpha = 1


        ctx.save()
        ctx.translate(cw2, ch2)
        ctx.beginPath()
        ctx.rotate(time * 5)
        

        time += .01
        let steps = 100
        let scale = Math.sin(time) * 70 * Math.sin(time * 10)
        let frequency = .1
        let radius = 350

        let n = 0
        n = simplex.noise3D(time, Math.cos(0), Math.sin(0)) * scale

        ctx.moveTo(Math.cos(0) * radius + n, Math.sin(0) * (radius + n))
        for (let x = 0; x < steps; x++) {
            n = simplex.noise3D(
                time,
                Math.cos((x/steps) * Math.PI * 2),
                Math.sin((x/steps) * Math.PI * 2)
            ) * scale

            // ctx.setLineDash([50, 40])

            
            // n = simplex.noise2D(time, (x * frequency)) * scale
            ctx.lineTo(
                Math.cos(Math.PI * 2 * (x / steps)) * (radius + n),
                Math.sin(Math.PI * 2 * (x / steps)) * (radius + n)
            )
            // ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`
            ctx.strokeStyle = "rgba(255, 255, 255, 1)"
        }
        n = simplex.noise3D(time, Math.cos(0), Math.sin(0)) * scale
        ctx.lineTo(Math.cos(0) * radius + n, Math.sin(0) * (radius + n))

        
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
    }
    tick()

    // oscillator.connect(context.destination)
    // oscillator.start()

}
app()
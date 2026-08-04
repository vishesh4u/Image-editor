let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    }
}

const imageCanvas = document.querySelector("#image-canvas")
const imgInput = document.querySelector("#image-input")
const canvasCtx = imageCanvas.getContext("2d")
const resetButton = document.querySelector("#reset-btn")
const downloadButton = document.querySelector("#download-btn")
const presetsContainer = document.querySelector(".presets")

let image = null;

const filtersContainer = document.querySelector(".filters")

function createFilterElement(name, value, min, max) {
    const div = document.createElement("div")
    div.classList.add("filter")

    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.id = name

    const p = document.createElement("p")
    p.innerText = name

    div.appendChild(p)
    div.appendChild(input)



    input.addEventListener("input", (event) => {
        filters[name].value = input.value
        applyfilters();
    })
    return div
}

function createFilters() {

    Object.keys(filters).forEach(key => {

        const filterElement = createFilterElement(key, filters[key].value, filters[key].min, filters[key].max)

        filtersContainer.appendChild(filterElement);
    })

}
createFilters()


imgInput.addEventListener("change", (event) => {
    // console.log("change event fired")

    const file = event.target.files[0]
    const imagePlaceHolder = document.querySelector(".placeholder")
    imageCanvas.style.display = "block"
    imagePlaceHolder.style.display = "none"
    const img = new Image()
    img.src = URL.createObjectURL(file)


    img.onload = () => {
        image = img
        imageCanvas.width = img.width
        imageCanvas.height = img.height

        canvasCtx.drawImage(img, 0, 0)
    }
})

function applyfilters() {

    if (!image) return;

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit}) 
    
    contrast(${filters.contrast.value}${filters.contrast.unit}) 
    
    saturate(${filters.saturation.value}${filters.saturation.unit}) 
    
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit}) 
    
    blur(${filters.blur.value}${filters.blur.unit}) 
  
    grayscale(${filters.grayscale.value}${filters.grayscale.unit}) 

    sepia(${filters.sepia.value}${filters.sepia.unit})
    
    opacity(${filters.opacity.value}${filters.opacity.unit}) 
    
    invert(${filters.invert.value}${filters.invert.unit}) 
    
    `;


    canvasCtx.drawImage(image, 0, 0);
}


resetButton.addEventListener("click", () => {
    filters = {
        brightness: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        contrast: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        saturation: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        hueRotation: {
            value: 0,
            min: 0,
            max: 360,
            unit: "deg"
        },
        blur: {
            value: 0,
            min: 0,
            max: 20,
            unit: "px"
        },
        grayscale: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
        sepia: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
        opacity: {
            value: 100,
            min: 0,
            max: 100,
            unit: "%"
        },
        invert: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        }
    }
    applyfilters()

    filtersContainer.innerHTML = ""
    createFilters()

})

downloadButton.addEventListener("click", () => {
    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()
})

const presets = {
    original: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    vintage: {
        brightness: 110,
        contrast: 90,
        saturation: 80,
        hueRotation: 15,
        blur: 0,
        grayscale: 10,
        sepia: 40,
        opacity: 100,
        invert: 0
    },

    BlackWhite: {
        brightness: 105,
        contrast: 130,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    cinematic: {
        brightness: 95,
        contrast: 135,
        saturation: 115,
        hueRotation: -5,
        blur: 0,
        grayscale: 0,
        sepia: 8,
        opacity: 100,
        invert: 0
    },

    warm: {
        brightness: 108,
        contrast: 105,
        saturation: 125,
        hueRotation: -10,
        blur: 0,
        grayscale: 0,
        sepia: 18,
        opacity: 100,
        invert: 0
    },

    cool: {
        brightness: 98,
        contrast: 110,
        saturation: 115,
        hueRotation: 18,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    faded: {
        brightness: 110,
        contrast: 75,
        saturation: 70,
        hueRotation: 0,
        blur: 1,
        grayscale: 8,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    dramatic: {
        brightness: 90,
        contrast: 170,
        saturation: 140,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0
    },

    dreamy: {
        brightness: 120,
        contrast: 85,
        saturation: 120,
        hueRotation: 8,
        blur: 3,
        grayscale: 0,
        sepia: 8,
        opacity: 100,
        invert: 0
    },

    retro: {
        brightness: 112,
        contrast: 92,
        saturation: 75,
        hueRotation: 12,
        blur: 1,
        grayscale: 18,
        sepia: 35,
        opacity: 100,
        invert: 0
    }
};

Object.keys(presets).forEach(presetName => {
    const presetbutton = document.createElement("button")
    presetbutton.classList.add("btn")
    presetbutton.innerText = presetName
    presetsContainer.appendChild(presetbutton)

    presetbutton.addEventListener("click", () => {
        const preset = presets[presetName]

        Object.keys(preset).forEach(filterName => {
            filters[filterName].value = preset[filterName]

        })

        applyfilters()
        filtersContainer.innerHTML = ""
        createFilters()

    })
})





const jsonVehicle = [

    {
        name: "General",
        id: "general",
        fields: [
            {
                name: "Name",
                id: "name",
                type: "text",
                default: "",
                required: true,
            },
            {
                name: "Description",
                id: "description",
                type: "text-area",
                default: "",
                required: true,
            },
            {
                name: "Materials",
                id: "materials",
                type: "materials",
                default: [],
                required: true,
            }
        ]
    },
    {
        name: "Definitions",
        id: "definitions",
        fields: [
            {
                name: "Name",
                id: "name",
                type: "text",
                default: "",
                required: true,
            },
            {
                name: "Description",
                id: "description",
                type: "text-area",
                default: "",
                required: false,
            },
            {
                name: "Extra Materials",
                id: "extraMaterials",
                type: "materials",
                default: [],
                required: false,
            }
        ]
    },
    {
        name: "Motorized",
        id: "motorized",
        fields: [
            {
                name: "Is Aircraft",
                id: "isAircraft",
                type: "checkbox",
                default: false,
                required: false,
            },
            {
                name: "Is Blimp",
                id: "isBlimp",
                type: "checkbox",
                default: false,
                required: false,
            },
            {
                name: "Is Trailer",
                id: "isTrailer",
                type: "checkbox",
                default: false,
                required: false,
            },
            {
                name: "Is Front Wheel Drive",
                id: "isFrontWheelDrive",
                type: "checkbox",
                default: false,
                required: false,
            },
            {
                name: "Is Rear Wheel Drive",
                id: "isRearWheelDrive",
                type: "checkbox",
                default: false,
                required: false,
            },
        ]
    }

]

export default jsonVehicle
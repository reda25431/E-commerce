export const getStatusColor = (status) => {
    switch (status) {
        case "Not Process":
            return 'bg-gray-200'
        case "Processing":
            return 'bg-blue-200'
        case "Complated":
            return 'bg-green-200'
        case "Cancel":
            return 'bg-red-200'

    }
}

export const statusActive = (enabled) => {
    switch (enabled) {
        case true:
            return 'text-green-600'
        case false:
            return 'text-red-600'
    }
}
import REGISTRATION_STEPS_LABELS from '../constants/RegisterationSteps'

const getRegistrationStep = (nullArray) => {
    if (!nullArray) return []
    const nullSteps = []
    Object.keys(REGISTRATION_STEPS_LABELS).forEach((label) => {
        if (nullArray[REGISTRATION_STEPS_LABELS[label]] === null) nullSteps.push(label)
    })
    return nullSteps
}

export default getRegistrationStep
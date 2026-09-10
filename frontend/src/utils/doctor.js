export function getLoggedInDoctor() {
    const doctor = localStorage.getItem("doctor");

    if (!doctor) {
        return null;
    }

    try {
        return JSON.parse(doctor);
    } catch (error) {
        console.error(
            "Failed to parse doctor data:",
            error
        );

        return null;
    }
}
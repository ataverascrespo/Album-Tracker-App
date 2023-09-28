import ProfilePasswordSettingsForm from "./ProfilePasswordSettingsForm"

function ProfilePasswordSettings() {
    return (
        <div className="h-full flex my-12 flex-col justify-center gap-8 items-start">

            {/* header */}
            <div className="flex flex-col gap-2">
                <h2 className="text-base sm:text-lg md:text-2xl font-bold text-neutral-800 dark:text-neutral-50">Change your password</h2>
                <p className="text-sm md:text-lg">Enter details below to change your password.</p>
            </div>

            <ProfilePasswordSettingsForm></ProfilePasswordSettingsForm>
        </div>
    )
}

export default ProfilePasswordSettings
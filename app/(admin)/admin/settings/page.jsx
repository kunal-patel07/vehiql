import React from 'react'
import {SettingsForm} from './_components/settings-form'

export const metadata = {
    title :"Settings | Autonexis admin",
    description : "Manage delarship working hours and admin users"
}

const SetttingPage = () => {
  return (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <SettingsForm/>
    </div>
  )
}

export default SetttingPage

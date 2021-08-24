import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import type { NextPage } from 'next'
import { Text } from 'atomize'
import { ParsedToken } from '../../types/parsed-token'
import React from 'react'
import { GbsMenu } from '../../components'


const ProfilePage = () => {
    const { keycloak } = useKeycloak<KeycloakInstance>()
    const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed

    const profile = keycloak?.authenticated ? (
        <>
            <ul>
                <li>
                    <span className="font-weight-bold mr-1">Email:</span>
                    <span className="text-muted">{parsedToken?.email ?? ''}</span>
                </li>
                <li>
                    <span className="font-weight-bold mr-1">Username:</span>
                    <span className="text-muted">
                        {parsedToken?.preferred_username ?? ''}
                    </span>
                </li>
                <li>
                    <span className="font-weight-bold mr-1">First Name:</span>
                    <span className="text-muted">{parsedToken?.given_name ?? ''}</span>
                </li>
                <li>
                    <span className="font-weight-bold mr-1">Last Name:</span>
                    <span className="text-muted">{parsedToken?.family_name ?? ''}</span>
                </li>
            </ul>
        </>
    ) : (
        <span>Please login to view profile.</span>
    )

    return (
        <>
            {profile}
        </>
    )
}

export default ProfilePage
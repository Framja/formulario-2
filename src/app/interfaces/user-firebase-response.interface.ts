export interface UserFirebaseResponse {
    kind?:         string;
    idToken?:      string;
    email?:        string;
    refreshToken?: string;
    expiresIn?:    string;
    localId?:      string;
    displayName?:  string;
}

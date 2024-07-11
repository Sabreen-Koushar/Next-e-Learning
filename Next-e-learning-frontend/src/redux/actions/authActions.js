export const loginUser=(user)=>{
    return {
        type:'LOGIN_SUCCESS',
        payload:{isAuthenticated:true,user},
    }
}

export const updateProfileImage=(profileImage)=>({
    type:'UPDATE_PROFILE_IMAGE',
    payload:profileImage,
})
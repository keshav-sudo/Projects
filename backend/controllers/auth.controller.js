export const signup = (req , res)=>{
    res.json({
        data : "you hit the signup endpoint"
    })
}

export const signin = (req , res)=>{
    res.json({
        data : "you hit the signin endpoint"
    })
}

export const signout =  (req, res)=>{
    res.send("you hit logout end point")
};
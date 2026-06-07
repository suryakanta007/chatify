class Auth{
    async register(req,res){
        res.status(200).json({message:"THis is register controller"})
    }
    async login(req,res){
        res.status(200).json({message:"THis is login controller"})
    }

    async logout(req,res){
        res.status(200).json({message:"THis is logout controller"})
    }
}

export default new Auth();
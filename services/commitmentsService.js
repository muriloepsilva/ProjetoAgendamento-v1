let commitments = require("../models/commitments.js")
let mongoose = require("mongoose")
const commitmentsFactory = require("../factories/commitmentsFactory.js")


const Coms = mongoose.model("Commitments", commitments)

class CommitmentsService{
    async createCommitments(name, email, description, cpf, date, time){
        let newComs = new Coms({
            name,
            email,
            description,
            cpf,
            date,
            time,
            finished: false
        })

        try{
            await newComs.save()
            return true
        }catch(err){
            console.log(err)
            return false
        }
        
    }

    async getAllCommitments(showFinished){
        if(showFinished) return await coms.find()
        else{
            let comms = await Coms.find({'finished': false})
            let commitments = []

            comms.forEach(commitment => {
                commitments.push(commitmentsFactory.Build(commitment))
            })

            return commitments
        }
    }
}

module.exports = new CommitmentsService()
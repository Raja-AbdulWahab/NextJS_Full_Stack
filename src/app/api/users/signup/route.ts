import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModels'
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'

connect()


export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        
        console.log(reqBody)

    //Check if user already exist
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json(
                {error: "User already Exists"},
                {status:400},)
        }
        
    //Hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const saveUser = await newUser.save()
        console.log(saveUser)

        return NextResponse.json({
            message: "User created Successfully",
            success: true,
            saveUser
        })

    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
    
}
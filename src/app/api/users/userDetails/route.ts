import { NextRequest, NextResponse } from 'next/server'
import getDataFromToken from '@/helpers/getDataFromToken'
import User from '@/models/userModels'
import { connect } from '@/dbConfig/dbConfig'

connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({ _id: userId }).select('-password -isAdmin')// password and admin i dont want.

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            message: "User Found",
            data: user
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 400 }
        )
    }
}
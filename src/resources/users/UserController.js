import { Types } from 'mongoose'
import User from './User'
import { Controller, Get, Post } from 'expresstful'

@Controller('/users')
export default class UserController {
  @Get('/')
  async root (req, res) {
    try {
      const users = await User.find()
      res.json(users)
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }
  }

  @Post('/')
  async create (req, res) {
    const user = new User({
      _id: new Types.ObjectId(),
      username: req.body.username,
      password: req.body.password
    })

    try {
      const savedResult = await user.save()
      res.json(savedResult)
    } catch (error) {
      console.log(error)
      res.status(500).json({
        error: error.message
      })
    }
  }
}
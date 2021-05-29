import { io } from "../http"
import { ConnectionsService } from "../services/ConnectionsService"
import { UserService } from "../services/UserService"
import { MessagesService } from "../services/MessagesService"

interface IParams {
  text: string
  email: string
}


io.on("connect", (socket) => {
  const connectionsService = new ConnectionsService()
  const messagesService = new MessagesService()
  const userService = new UserService()

  socket.on("client_first_access", async (params) => {
    const { text, email } = params as IParams
    const socket_id = socket.id

    const user = await userService.create(email)
    const connection = await connectionsService.findByUserId(user.id)

    if (!connection) {
      await connectionsService.create({
        user_id: user.id,
        socket_id
      })
    } else {
      connection.socket_id = socket_id
      connection.updated_at = new Date()

      await connectionsService.create(connection)
    }

    await messagesService.create({
      text,
      user_id: user.id
    })
  })
})
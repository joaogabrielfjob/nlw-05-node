import { Router } from "express"
import { SettingsController } from "./controllers/SettingsController"

const routes = Router()
const settingsController = new SettingsController()

/**
 * Tipos de parametros
 * 
 * Routes Params => Parametros de rotas
 * localhost:3333/settings/1
 * 
 * Query Params => Parametros de busca
 * localhost:3333/settings/1?search=algumacoisa
 * 
 * Body Params => Parametros de
 * { JSON }
 */

routes.post("/settings", settingsController.create)

export { routes }
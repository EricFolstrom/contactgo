import 'module-alias/register'
import express from 'express'
import { createContactEndpoints } from '@/routes'
import { PORT } from '@/config'
import setupDatabase from '@/db'
import { contactFactory } from '@/db/Contact'

// crée la fonction qui lancera l'application
async function start (): Promise<void> {
  // Connection a la base de données
  await setupDatabase()

  // instancier l'application
  const app = express()
  // configurer express pour analyse les requêtes reçues sous le format JSON
  app.use(express.json())

  // utiliser le routeur de contact
  app.use('/contacts/', createContactEndpoints(contactFactory))

  // demarer l'application sur un port donné
  app.listen(PORT, () => {
    console.log(`listening on port ${3002}`)
  })
}

start().then((result) => result).catch((error) => { console.log(error) })

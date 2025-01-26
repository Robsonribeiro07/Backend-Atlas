  import express from 'express'
  import cors from 'cors'

  import connectDb from './config/db.js'
  import router from './router/index.js'
  import profile from './router/profile.js'
  import habit from './router/habits.js'
  const app = express()

  app.use(cors())

  app.use(express.json({limit: '50mb'}))

  await connectDb();  
    



  app.use('/api', router)
  app.use('/apiHabit', habit)
  app.use('/apiUser', profile)
  app.listen(3030, '0.0.0.0', () => {
      console.log('Servidor rodando na porta 3000')
  })


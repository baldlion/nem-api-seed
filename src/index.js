import api from '@/api'

const port = process.env.PORT || 4000

api.listen(port, () => {
  console.log(`API server running on port ${port}`)
})

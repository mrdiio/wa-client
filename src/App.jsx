import { useEffect, useState } from 'react'
import { Button } from './components/ui/button'
import { io } from 'socket.io-client'
import QRCode from 'react-qr-code'

const socket = io('http://localhost:3000')

function App() {
  const [qrCode, setQrCode] = useState('')

  useEffect(() => {
    socket.emit('connected', 'Hello from client')
    socket.on('qr', (qr) => {
      console.log('QR', qr)
      setQrCode(qr)
    })
  }, [])

  return (
    <div className="container flex flex-col gap-5 py-12">
      <Button
        onClick={async () => {
          setQrCode('')
          socket.emit('whatsappSession', {
            id: '123',
          })
        }}
      >
        Click me
      </Button>

      {qrCode !== '' && <QRCode value={qrCode} />}
    </div>
  )
}

export default App

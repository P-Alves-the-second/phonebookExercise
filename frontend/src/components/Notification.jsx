
const Notification = ({ message, type}) => {
  if (message === null) {
    return null
  }
  const notificationStyle = {
  }
  if(type)notificationStyle.color='red'
  else notificationStyle.color='green'
  return (
    <div className='notification' style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
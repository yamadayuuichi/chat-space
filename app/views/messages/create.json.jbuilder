json.id @message.id
json.date    @message.created_at.strftime("%Y/%m/%d(%b) %H:%M")
json.user_name @message.user.name
json.image @message.image.url
json.content @message.content
json.id @message.id
json.content @message.content
json.image @message.image.url
json.date    @message.created_at.strftime("%Y/%m/%d(%b) %H:%M")
json.user_name @message.user.name
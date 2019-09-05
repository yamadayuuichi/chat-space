json.id @message.id
json.date    @message.created_at.strftime("%Y/%m/%d(%b) %H:%M")
json.user_name @message.user.name
json.(@message, :content, :image)
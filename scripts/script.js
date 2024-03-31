const BOT_TOKEN = '7041394622:AAE5zYVbXY3WN2cVq0fK02HR6DUBgxGmGR4';
const CHAT_ID = '6852309127';

var message = "451586"; 
const sendMessage = async () => {
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message 
            })
        });

        const responseData = await response.json();
        console.log('Message sent:', responseData);
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

document.querySelector('.button').addEventListener('click', () => {
    sendMessage(); 
}); 




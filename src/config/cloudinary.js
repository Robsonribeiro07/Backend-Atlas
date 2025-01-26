import {v2 as cloudinary} from 'cloudinary'; // Não precisa especificar `.v2`

// Configure as credenciais do Cloudinary
cloudinary.config({
  cloud_name: 'ddrbxo7pj', // Substitua pelo nome da sua nuvem
  api_key: '564829634915456', // Substitua pela sua API key
  api_secret: 'kU6hift08GUOymsxOSHmrihfTEw', // Substitua pelo seu API secret
});

export default cloudinary; // Exporte a configuração do Cloudinary

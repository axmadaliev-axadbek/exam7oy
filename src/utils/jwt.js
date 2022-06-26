import  Jwt  from "jsonwebtoken";
let secretKey = 'seckert'

export default {
    sign: (payload) => Jwt.sign(payload, secretKey),
    verify: (token) => Jwt.verify(token, secretKey)
}



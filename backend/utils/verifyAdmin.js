import jwt from 'jsonwebtoken'

export default function verifyAdmin(req, res, next) {
    if (!req.headers['authorization']) {
            return res.status(401).json({ message: 'Authentication header required' })
        }
    
        console.log(req.headers['authorization']);
        
        const tokenToDecode = req.headers['authorization'].split(' ')[1];
        console.log(tokenToDecode);
    
        jwt.verify(tokenToDecode, process.env.JWT_SECRET, (err, decodedUser) => {
        if (err) {
          console.log(err);
          
          return res.status(403).json({ message: 'Invalid or expired token' }); 
        }

        if (!decodedUser.role || decodedUser.role != 'admin') {
        return res.status(403).json({ message: 'User is not admin' }); 
        }

        req.user = decodedUser;
        console.log("DECODED",decodedUser);
        next()} 
        )
}
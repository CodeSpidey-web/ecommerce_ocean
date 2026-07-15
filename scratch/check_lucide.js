const lucide = require('lucide-react');
const keys = Object.keys(lucide);

console.log("Git matches:", keys.filter(k => k.toLowerCase().includes('git')));
console.log("Insta matches:", keys.filter(k => k.toLowerCase().includes('insta')));
console.log("Twit matches:", keys.filter(k => k.toLowerCase().includes('twit')));
console.log("Face matches:", keys.filter(k => k.toLowerCase().includes('face')));

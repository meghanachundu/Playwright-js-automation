export function randomEmail() {
return `user_${Math.floor(Math.random() * 10000)}@example.com`;
}


export function randomName() {
return `User${Math.floor(Math.random() * 10000)}`;
}


export async function waitForTimeout(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}
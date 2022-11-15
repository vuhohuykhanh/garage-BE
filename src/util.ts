interface IMessage{
	res: any,
	message?: string | any,
}


export async function success({res, message}: IMessage){
	await res.status(200).send(message || 'Success')
}

export async function error({res, message}: IMessage){
	await res.status(401).send(message || 'Error');
}

export function isEmptyObject(object) {
	return JSON.stringify(object) === "{}"
}
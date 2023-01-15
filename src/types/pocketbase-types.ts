/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Chats = "chats",
	ChatsUsers = "chats_users",
	Messages = "messages",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string

// System fields
export type BaseSystemFields = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: { [key: string]: any }
}

export type AuthSystemFields = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields

// Record types for each collection

export type ChatsRecord = {
	chat_name?: string
}

export type ChatsUsersRecord = {
	chat_id?: RecordIdString
	user_id?: RecordIdString
}

export type MessagesRecord = {
	chat_id?: RecordIdString
	message?: string
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type ChatsResponse = ChatsRecord & BaseSystemFields
export type ChatsUsersResponse = ChatsUsersRecord & BaseSystemFields
export type MessagesResponse = MessagesRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	chats: ChatsRecord
	chats_users: ChatsUsersRecord
	messages: MessagesRecord
	users: UsersRecord
}
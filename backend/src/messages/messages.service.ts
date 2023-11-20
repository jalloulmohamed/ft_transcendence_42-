/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { ParticipentService } from 'src/Participent/Participent.service';
import { CreateMessageParams } from 'src/utils/types';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MessagesService {


    constructor(private prisma : PrismaService, private participentService : ParticipentService, private EventEmitter: EventEmitter2)
    {

    }


    async createMessags(user : User, params: CreateMessageParams) {
      let recipientUser;
      let senderUser;
        const chat = await this.prisma.chatParticipents.findUnique({
            where: {
              id: params.participentsId,
            },
            include: {
                // messages: true,
                sender: true,
                recipient: true,
              }
          });
          if(!chat)
            throw new HttpException('Conversation not found', HttpStatus.BAD_REQUEST)
        // const {sende, recipient } = chat;
        if((chat.sender.id !== user.id) && (chat.recipient.id !== user.id)){

            throw new HttpException('Cannot create message in this conversation', HttpStatus.BAD_REQUEST)

        }
      
      

        if(user.id === chat.recipient.id)
        {

            const newChat = await  this.prisma.chatParticipents.update({
              where: { id: chat.id},
              data: { senderId: user.id, recipientId: chat.sender.id },
            });
            console.log(newChat);
        }
        if(chat.sender.id === user.id)
        {
            senderUser = user;
            recipientUser = chat.recipient;
        }else if (chat.sender.id !== user.id)
        {
          senderUser = user;
          recipientUser = chat.sender;
        }

        const content = params.content;
        const messageCreate = await this.prisma.message.create({
          data: {
            content,
            sender: {
              connect: { id: senderUser.id }, // Replace with the actual sender's user ID
            },
            recipient: {
              connect: { id: recipientUser.id }, // Replace with the actual recipient's user ID
            },
            participents: {
              connect: { id: chat.id }, // Replace with the actual ChatParticipents ID
            },
            
            
           
          },
          include: {
            sender: true,
            recipient: true,
          },
        });

        await this.prisma.chatParticipents.update({
          where: { id: chat.id },
          data: {
            lastMessageId: messageCreate.id,
          },
        });


       
        return messageCreate;
      }

 
    async getMessageByConversationId(conversationId : string){

      

      const chatParticipents = await this.prisma.chatParticipents.findUnique({
        where: { id: conversationId},
        include: {
          messages: {
            include: {
              sender: true,
              recipient: true,
            },
            orderBy: {
              createdAt: 'desc', // You can change the sorting order as needed
            },
          },
        },
      });
    
      return chatParticipents.messages;
    }
      
    }
    
import 'server-only';
import { get_secret_config } from '@/server/utilities/load_server_env_variables';
import { env } from '@/env.mjs';
export interface EmailUserInvitation {
  emailAddress: string;
  subject?: string;
  invitationLink: string;
  appName: string;
  supportEmailAddress: string;
  appPhysicalAddressForEmail: string;
}

export interface Attachment {
  content: string;
  filename: string;
  type: string;
  disposition: string;
}
const sg = require('@sendgrid/mail');
//
//
// interface Email {
//     to: any;
//     cc: any;
//     from: string;
//     templateId: any;
//     dynamic_template_data: {
//         message: string;
//         subject:string;
//         sender_name: string;
//         sender_address: string;
//         sender_city: string;
//         sender_state: string;
//         sender_zip: string;
//         sender_country: string;
//     };
// }
// //TextEmailAddress customEmailTokenId
// export const send_text = async (subject:string, message:string)=> {
//     try {
//       var emailAddressesTo = config.TextEmailAddress;
//       var emailAddressesCC = config.TextBackUpEmailAddress ? config.TextBackUpEmailAddress: '';
//       var emailTokenId = config.customEmailTokenId;
//       return await submit_email(subject, message, emailAddressesTo , emailAddressesCC, emailTokenId)
//     }
//     catch(err) {
//       console.log("Caught error trying to send text.")
//       console.log(err)
//       throw err
//     }
//
//
//
//
// }
export const send_text = async (subject: string, message: string) => {
  try {
    const emailAddressesTo = process.env.TEXT_EMAIL_ADDRESS || '';
    const emailAddressesCC = process.env.TEXT_BACKUP_EMAIL_ADDRESS ? process.env.TEXT_BACKUP_EMAIL_ADDRESS : '';
    const emailTokenId = process.env.CUSTOM_EMAIL_TOKEN_ID || '';
    return await submit_basic_text_email(subject, message, emailAddressesTo, emailAddressesCC, emailTokenId);
  } catch (err) {
    console.log('Caught error trying to send text.');
    console.log(err);
    throw err;
  }
};

export const send_basic_email = async (subject: string, message: string, emailTokenId: string) => {
  try {
    const emailAddressesTo = env.CONTACT_TO;
    const emailAddressesCC = '';
    return await submit_basic_text_email(subject, message, emailAddressesTo, emailAddressesCC, emailTokenId);
  } catch (err) {
    console.log('Caught error trying to send text.');
    console.log(err);
    throw err;
  }
};

interface Email {
  to: any;
  cc: any;
  from: string | EmailAndName;
  templateId: any;
  subject?: string;
  dynamic_template_data: {
    message: string;
    subject: string;
    sender_name: string;
    sender_address: string;
    sender_city: string;
    sender_state: string;
    sender_zip: string;
    sender_country: string;
  };
}

interface EmailAndName {
  email: string;
  name: string;
}

const createBasicTextEmail = (
  templateId: string,
  subject: string,
  message: string,
  emailAddressesTo: string,
  emailAddressesCC: string | null,
  fromAddress: string | EmailAndName = {
    email: env.CONTACT_FROM_EMAIL,
    name: env.CONTACT_FROM_NAME
  }
) => {
  const msg: Email = {
    to: emailAddressesTo,
    cc: emailAddressesCC,
    from: fromAddress,
    templateId: templateId,
    dynamic_template_data: {
      message: message,
      subject: subject,
      sender_name: 'Crutchfield Efficiency Solutions, LLC',
      sender_address: '1021 Belcor Dr',
      sender_city: 'Spring Hill',
      sender_state: 'TN',
      sender_zip: '37174',
      sender_country: 'USA'
    }
  };
  return msg;
};

export const submit_basic_text_email = async (
  subject: string,
  message: any,
  emailAddressTo: string,
  emailAddressCC: string | null,
  emailTokenId: string,
  fromAddress: string | EmailAndName = 'urgent@iterloop.com'
) => {
  const msgList: any[] = [];
  msgList.push(createBasicTextEmail(emailTokenId, subject, message, emailAddressTo, emailAddressCC, fromAddress));
  // for (var emailAddy of emailAddresses) {
  //     msgList.push(createEmail(config.ReportEmailTokenId, emailAddy, reportData));
  // }
  await send_email(msgList, {});
};

let haveSetApiKey = false;
const send_email = async (email: any, params: any, ): Promise<any> => {
  if (Array.isArray(email)) {
    return await Promise.all(email.map((current) => send_email(current, params)));
  }

    if (!haveSetApiKey) {
      const secretConfig = await get_secret_config();
      sg.setApiKey(secretConfig.SENDGRID_API_KEY);
      haveSetApiKey = true;
    }
    
  
  try {
    
    console.log(
      JSON.stringify({
        type: 'SENDING_EMAIL',
        email
      })
    );
    const result = await sg.send(email);
    console.log(
      JSON.stringify({
        type: 'SEND_EMAIL_SUCCESS',
        result: result
      })
    );
    return { success: true };
  } catch (err: any) {
    console.log('Error with email sent via send grid');
    console.log(err);
    console.log(JSON.stringify(err.response.body.errors));
    throw err;
  }
};

const remove_duplicate_recipients = (to: string[] | null, cc: string[] | null, bcc: string[] | null): [string[], string[], string[]] => {
  const allRecipients: string[] = [];
  const arrays = [to ? to : [], cc ? cc : [], bcc ? bcc : []];
  const newArrays: [string[], string[], string[]] = [[], [], []];
  for (let i = 0; i < arrays.length; i++) {
    const thisArray = arrays[i] as any;
    var recipientsToRemoveFromThisArray: string[] = thisArray.filter((recipient: any) => allRecipients.includes(recipient));
    const newArray: string[] = thisArray.filter((recipient: any) => !recipientsToRemoveFromThisArray.includes(recipient));
    allRecipients.push(...newArray);
    newArrays[i] = newArray;
    // for (var j = 0; j < thisArray.length; j++) {
    //   var thisRecipient = thisArray[j]
    //
    //   if (allRecipients.includes(thisRecipient)) {
    //     recipientsToRemoveFromThisArray.push(thisRecipient)
    //   }
    //   else {
    //     allRecipients.push(thisRecipient)
    //   }
    // }
  }
  return newArrays;
};

export async function send_html_email(
  emailAddressesTo: string[],
  fromAddress: string,
  subject: string,
  html: string,
  attachments: Attachment[],
  emailAddressesCC: string[] | null = null,
  BCC: string[] | null = null
) {

  if (haveSetApiKey== false) {
    const secretConfig = await get_secret_config();
    sg.setApiKey(secretConfig.SENDGRID_API_KEY);
    haveSetApiKey = true;
  }
    
  const msg: any = {
    to: emailAddressesTo,
    from: fromAddress,
    subject,
    html: html,
    attachments
  };

  if (emailAddressesCC !== null) {
    msg.cc = emailAddressesCC;
  }
  if (BCC !== null) {
    msg.bcc = BCC;
  }
  return await sg.send(msg);
  //return await submit_email(subject, message, emailAddressesTo , fromAddress, emailTokenId,emailAddressesCC,BCC)
}

export async function send_text_email(
  emailAddressesTo: string[],
  fromAddress: string,
  subject: string,
  message: string,
  attachments: Attachment[],
  emailAddressesCC: string[] | null = null,
  BCC: string[] | null = null
) {

  if (haveSetApiKey== false) {
    const secretConfig = await get_secret_config();
    sg.setApiKey(secretConfig.SENDGRID_API_KEY);
    haveSetApiKey = true;
  }
    
  const msg: any = {
    to: emailAddressesTo,
    from: fromAddress,
    subject,
    text: message,
    attachments
  };

  if (emailAddressesCC !== null) {
    msg.cc = emailAddressesCC;
  }
  if (BCC !== null) {
    msg.bcc = BCC;
  }
  return await sg.send(msg);
  //return await submit_email(subject, message, emailAddressesTo , fromAddress, emailTokenId,emailAddressesCC,BCC)
}

const admin = require('firebase-admin')

let serviceAccount = require('../lib/config/saehoonssss-firebase-adminsdk-7hpsn-960afd1bf4.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

exports.send = async (invite_type, inviter_id, inviter_nickname, target_name, token) => {
    const target_token = "eEbHlNttTOyoULKuXtfd_j:APA91bEsmE_ItlNg1kS0nmSC-J5CEwekAvqpXCG5ROtxJ3ccAp8x2LhymIUyLovSfdMsDojC76OhXbhMkXDm8jZ4LFjULByKVBHTslrE2sN6snATKFE2MEOOBD1rM8WPE1iye-eFFADh"

    let message = {
        'token': target_token,

        'notification': {
            'title': invite_type + "invite notification",
            'body': inviter_nickname + " invited you " + invite_type + "!",
        },
        'android': {
            'notification': {
                'clickAction': ".view.MainActivity"
            }
        },
        'data': {
            'invite_type': invite_type,
            'inviter': inviter_id,
            'target_name': target_name 
        }
    }

    return admin.messaging().send(message)
}
const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

const apiId = 2392599;
const apiHash = "7e14b38d250953c8c1e94fd7b2d63550";

exports.adding = async (req, res) => {
  var ish = null;
  console.log(req.body);
  try {
    const { stringSession, fromGroup, ToGroup, offset } = req.body;
    const client = new TelegramClient(
      new StringSession(stringSession),
      apiId,
      apiHash,
      {
        connectionRetries: 5,
      }
    );

    try {
      await client.connect({
        onError: (err) => (ish = "Account Login Failed"),
      });
      var iss = (await client.getMe()).accessHash;
      Adding({ client, fromGroup, ToGroup, offset });
      ish = "Login Sucessfull and start adding";
    } catch (err) {
      ish = "Account Login Failed";
    }
  } catch (err) {
    ish = err;
  }

  return res.status(200).send({
    mess: ish,
  });
};

async function Adding({ client, fromGroup, ToGroup, offset }) {
  try {
    await client.invoke(
      new Api.channels.JoinChannel({
        channel: ToGroup,
      })
    );

    const result = await client.invoke(
      new Api.channels.GetParticipants({
        channel: fromGroup,
        filter: new Api.ChannelParticipantsRecent({}),
        offset: offset,
        limit: 100,
        hash: 0,
      })
    );
    for await (const participant of result.users) {
      try {
        if (participant.username != null) {
          await client.invoke(
            new Api.channels.InviteToChannel({
              channel: ToGroup,
              users: [participant.username],
            })
          );
          console.log(participant.firstName + " Added");
        }
      } catch (err) {
        console.log(participant.firstName + " " + err.errorMessage);
        if (err.errorMessage == "PEER_FLOOD") {
          break;
        } else if (err.errorMessage == "FLOOD") {
          break;
        }
      }
    }
    console.log("Adding Done");
  } catch (err) {
    console.log(err.errorMessage + " " + err);
  }
}

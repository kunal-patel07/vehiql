import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";
export const checkUser = async () => {

    console.log("checkUser called");

  const user = await currentUser();
console.log("Clerk user:", user?.id);   
  if (!user) {
    return null;
  }

  console.log("before findUnique");


  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },

    });
    if(loggedInUser){
        return loggedInUser;
    }
    console.log("After findUnique");


    const newUser  =await db.user.create({
        data :{ 
            clerkUserId:user.id,
            name : `${user.firstName} ${user.lastName}`,
            imageUrl : user.imageUrl,
            email : user.emailAddresses[0].emailAddress
        }
    })
    console.log(newUser + "this is the line ")
    return newUser;


  } catch (error) {

    console.log("ERROR" + error)
  }
};

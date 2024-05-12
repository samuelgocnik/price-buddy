import { type User } from '@/db/schema/users';
import { getUserById } from '@/server-actions/user';

import { EditProfileFormBase } from './edit-profile-form-base';

type EditProfileFormProps = {
	userId: User['id'];
};

export const EditProfileForm = async ({ userId }: EditProfileFormProps) => {
	// Its not necessary to fetch the user from database here because all the data is already available in the session object
	// however in case we will add some additional data to the user object we would have to rework the code without this fetch
	const dbUser = await getUserById(userId);

	await new Promise(resolve => setTimeout(resolve, 3000));

	if (!dbUser) {
		return <div>User not found :(</div>;
	}
	// The whole form is dependent on the user data from the database because of the form default values
	return <EditProfileFormBase user={dbUser} />;
};

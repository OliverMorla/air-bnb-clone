import { useLoaderData } from "../room";
import { getProfile } from "@/routes/root";
import "./style.scss";

const Profile = (): JSX.Element => {
  const profile = useLoaderData<typeof getProfile>();
  return (
    <main className="profile-wrapper">
      <section className="heading-wrapper">
        <h1>Profile</h1>
      </section>
      <section className="content-wrapper">
        <p>
          <span>ID: </span>
          {profile.id}
        </p>
        <p>
          <span>Username: </span>
          {profile.username}
        </p>
        <p>
          <span>Email: </span>
          {profile.email}
        </p>
        <p>
          <span>Password: </span>
          {profile.password}
        </p>
        <p>
          <span>Date of Birth: </span>
          {profile.date_of_birth}
        </p>
        <div className="btn-wrapper">
          <button className="change-password-btn">Change Password</button>
          <button className="change-email-btn">Change Email</button>
          <button className="logout-btn">Log out</button>
        </div>
      </section>
    </main>
  );
};

export default Profile;

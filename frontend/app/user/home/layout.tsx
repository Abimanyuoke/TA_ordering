import UserTemplate from "@/components/userTemplate"
import UserList from "../../userList"

export const metadata = {
    title: 'Home',
    description: 'Generated by create next app',
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <div className="overflow-x-hidden overflow-y-hidden">
            <UserTemplate title="" id="home" menuList={UserList}>
                {children}
            </UserTemplate>
        </div>
    )
}

export default RootLayout
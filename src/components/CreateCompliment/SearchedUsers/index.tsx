import { Dispatch, ReactElement, SetStateAction } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Flex,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { User } from "../../../hooks/useUsers";

interface ComplimentInfo {
  userId: string;
  tagId: string;
  message: string;
}

interface SearchedUsersProps {
  children: ReactElement;
  searchedUsers: User[];
  sendComplimentInfo: ComplimentInfo;
  setSendComplimentInfo: Function;
  setSearchedUserName: Dispatch<SetStateAction<string>>;
  isOpen: boolean;
  setIsPopoverOpen: Dispatch<SetStateAction<boolean>>;
}

export function SearchedUsers({
  children,
  searchedUsers,
  sendComplimentInfo,
  setSendComplimentInfo,
  setSearchedUserName,
  isOpen,
  setIsPopoverOpen,
}: SearchedUsersProps) {
  return (
    <Popover isOpen={isOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Search user</PopoverHeader>
        <PopoverBody>
          {searchedUsers.map((user) => (
            <Flex
              key={user.id}
              align="center"
              mt="4"
              gap="4"
              _hover={{ cursor: "pointer", filter: "brightness(0.85)" }}
              onClick={() => {
                setSendComplimentInfo({
                  ...sendComplimentInfo,
                  userId: user.id,
                });
                setSearchedUserName(user.name);

                setIsPopoverOpen(false);
              }}
            >
              <Avatar bg="purple.400" size="md" name={user.name} />
              <Text>{user.name}</Text>
            </Flex>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

import {
    Button,
    HStack,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Progress,
    Td,
    Text,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import { MdArrowCircleDown, MdCheckCircle, MdIncompleteCircle } from "react-icons/md";
import { TransactionApi } from "./Transactions";

export interface TransactionRowProps {
    transaction: TransactionApi,
    onUpdateTransaction: (newStatus: string) => void
}

const TransactionRow = ({ transaction, onUpdateTransaction }: TransactionRowProps) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    return (
        <Tr>
            <Td>{transaction.name}</Td>
            <Td>
                <HStack>
                    <Icon
                        w='24px'
                        h='24px'
                        me='5px'
                        color={transaction.status === 'Approved' ? 'green.500' : "yellow.500"}
                        as={transaction.status === 'Approved' ? MdCheckCircle : MdIncompleteCircle}
                    />
                    <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {transaction.status}
                    </Text>
                </HStack>
            </Td>
            <Td>
                <Progress
                    variant='table'
                    colorScheme='green'
                    h='8px'
                    value={transaction.value}
                />
            </Td>
            <Td>
                <Menu>
                    <MenuButton as={Button} rightIcon={<MdArrowCircleDown />}>
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => onUpdateTransaction("Approved")}>Mark as Approved</MenuItem>
                        <MenuItem onClick={() => onUpdateTransaction("Pending")}>Mark as Pending</MenuItem>
                    </MenuList>
                </Menu>
            </Td>
        </Tr>

    );
}

export default TransactionRow
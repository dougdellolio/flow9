import {
    Box,
    Button,
    Card,
    Flex,
    Icon,
    Table,
    TableContainer,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    useToast
} from "@chakra-ui/react";
import { MdBarChart } from "react-icons/md";
import {
    useQueryClient,
    useQuery,
    useMutation
} from '@tanstack/react-query'
import TransactionRow from "./TransactionRow";
import { Spinner } from '@chakra-ui/react'
import { useState } from "react";

export interface UpdateTransactionArgs {
    newStatus: string;
    transaction: TransactionApi;
}

export interface TransactionApi {
    name: string;
    value: number;
    status: string;
}

const transactionsFromApi: TransactionApi[] = [
    { name: 'T1', value: 35, status: 'Pending' },
    { name: 'T2', value: 10, status: 'Approved' }
]

const Transactions = () => {
    const toast = useToast()
    const queryClient = useQueryClient()
    const [loadedTransactions, setLoadedTransactions] = useState<TransactionApi[]>(transactionsFromApi);

    const textColor = useColorModeValue("secondaryGray.900", "white");
    const iconColor = useColorModeValue("blue.500", "white");

    const { error, data, isFetching, refetch } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    toast({
                        title: `Fetching transactions`,
                        description: "Fetching transactions",
                        status: 'info',
                        duration: 1000,
                        isClosable: true,
                    })

                    resolve(loadedTransactions)
                }, 300);
            });

            // return axios
            //     .get('https://api.github.com/repos/tannerlinsley/react-query')
            //     .then((res) => res.data)
        }
    })

    const mutation = useMutation({
        //you can add retry on failure
        retry: 3,
        mutationFn: ({ newStatus, transaction }: UpdateTransactionArgs) => {
            //this would be a POST or PUT

            const updateTransactionByName = (
                nameToUpdate: string,
                newStatus: string
            ): TransactionApi[] => {
                return loadedTransactions.map(transaction => {
                    if (transaction.name === nameToUpdate) {
                        return {
                            ...transaction,
                            status: newStatus,
                        };
                    }
                    return transaction;
                });
            };


            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const results = updateTransactionByName(transaction.name, newStatus)

                    setLoadedTransactions(results)

                    resolve(loadedTransactions)
                }, 300)
            });
        },
        onMutate: () => {
            //always called on mutation
        },
        onError: async (error, variables, context) => {
            // An error happened!
            toast({
                title: `There was a problem updating the transaction`,
                description: "Unable to update the transaction", //use error here
                status: 'error',
                duration: 1000,
                isClosable: true,
            })
        },
        onSuccess: async (data, variables, context) => {
            toast({
                title: `Transaction Update Successful`,
                description: `Transaction updated`,
                status: 'success',
                duration: 1000,
                isClosable: true,
            })

            //invalidate any existing queries and refetch the transactions
            queryClient.invalidateQueries({ queryKey: ['transactions'] })
        },
        onSettled: async (data, error, variables, context) => {
            // Error or success... doesn't matter!
        },
    })


    if (isFetching) return <Spinner />

    if (error) return 'An error has occurred: ' + error.message

    return (
        <Card align='center' direction='column' w='100%'>
            <Flex align='center' w='100%' px='15px' py='10px'>
                <Text
                    me='auto'
                    color={textColor}
                    fontSize='xl'
                    fontWeight='700'
                    lineHeight='100%'>
                    Transactions
                </Text>
                <Button
                    justifyContent='center'
                    w='37px'
                    h='37px'
                    lineHeight='100%'
                    borderRadius='10px'
                >
                    <Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
                </Button>
            </Flex>

            <Box width="100%" >
                <TableContainer>
                    <Table >
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Status</Th>
                                <Th>Progress</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {loadedTransactions.map((transaction: TransactionApi, index: number) =>
                                <TransactionRow
                                    key={index}
                                    transaction={transaction}
                                    onUpdateTransaction={async (newStatus: string) => {
                                        const updateParameters: UpdateTransactionArgs = {
                                            newStatus,
                                            transaction
                                        };

                                        mutation.mutateAsync(updateParameters)
                                    }} />)}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Card>
    );
}

export default Transactions
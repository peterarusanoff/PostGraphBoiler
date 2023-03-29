import { Arg, Query, Resolver } from "type-graphql";
import { Inject } from "typedi";

import { Payload } from "./models";
import { PayloadService } from "./services";

@Resolver(Payload)
export class PayloadResolver {
    @Inject()
    private PayloadService: PayloadService

    @Query(returns => Payload)
    payload(@Arg("databaseId") databaseId: number) {
        return this.PayloadService.fetchPayload(databaseId) 
    }
}